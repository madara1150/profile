use crate::auth;
use actix_web::{web, HttpResponse, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
}

pub async fn login(req: web::Json<LoginRequest>) -> impl Responder {
    // In a real app, validate password here.
    // For this demo, we accept any username and issue a token.
    match auth::create_jwt(req.username.clone()) {
        Ok(token) => HttpResponse::Ok().json(serde_json::json!({
            "token": token,
            "message": "Login successful"
        })),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn protected(req: actix_web::HttpRequest) -> impl Responder {
    // Manual token extraction for demonstration
    // Ideally use an Extractor or Middleware
    if let Some(auth_header) = req.headers().get("Authorization") {
        if let Ok(auth_str) = auth_header.to_str() {
            if let Some(token) = auth_str.strip_prefix("Bearer ") {
                match auth::validate_token(token) {
                    Ok(token_data) => {
                        return HttpResponse::Ok()
                            .body(format!("Welcome user: {}", token_data.claims.sub));
                    }
                    Err(_) => return HttpResponse::Unauthorized().body("Invalid Token"),
                }
            }
        }
    }
    HttpResponse::Unauthorized().body("Missing or Invalid Authorization Header")
}
