use actix_web::{get, web, App, HttpServer, Resp, HttpResponse};
use serde::{Serialize};

#[derive(Serialize)]
struct Greeting {
    message: String,
    hostname: String,
    version: String,
}

#[get("/")]
async fn greet() -> HttpResponse {
    let hostname = std::env::var("HOSTNAME").unwrap_or_else(|_| "unknown".to_string());
    
    let greeting = Greeting {
        message: "Hello from Rust on Kubernetes!".to_string(),
        hostname,
        version: "1.0.0".to_string(),
    };
    
    HttpResponse::Ok().json(greeting)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting Rust Greeter service on 0.0.0.0:8080");
    
    HttpServer::new(|| {
        App::new().service(greet)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
