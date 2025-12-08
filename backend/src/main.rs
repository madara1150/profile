use actix_cors::Cors;
use actix_web::{http, web, App, HttpServer};

mod auth;
mod handlers;
mod models; // Keeping existing module if needed, though unused in auth

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    unsafe {
        std::env::set_var("RUST_LOG", "debug");
    }
    env_logger::init();

    println!("Starting server at http://127.0.0.1:8080");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin() // For development simplicity
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/login", web::post().to(handlers::login))
            .route("/protected", web::get().to(handlers::protected))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
