mod models;

use models::Project;

fn main() {
    let featured_projects = vec![
        Project::new(
            "E-Commerce Platform",
            "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80",
            Some(520),
            Some(520),
            Some("React & Node.js"),
        ),
        Project::new(
            "Task Management App",
            "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&q=80",
            Some(101),
            Some(101),
            Some("TypeScript System"),
        ),
    ];

    println!("{:#?}", featured_projects);
}
