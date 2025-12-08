use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey, TokenData, errors::Result as JwtResult};
use serde::{Deserialize, Serialize};
use chrono::{Utc, Duration};

const SECRET_KEY: &[u8] = b"secret"; // In production, use environment variable

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub fn create_jwt(uid: String) -> JwtResult<String> {
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: uid,
        exp: expiration as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(SECRET_KEY),
    )
}

pub fn validate_token(token: &str) -> JwtResult<TokenData<Claims>> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(SECRET_KEY),
        &Validation::default(),
    )
}
