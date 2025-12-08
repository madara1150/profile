#[allow(dead_code)]
#[derive(Debug)]
pub struct Project {
    pub title: String,
    pub image: String,
    pub progress: Option<u32>,
    pub total: Option<u32>,
    pub label: Option<String>,
}

#[allow(dead_code)]
impl Project {
    pub fn new(
        title: &str,
        image: &str,
        progress: Option<u32>,
        total: Option<u32>,
        label: Option<&str>,
    ) -> Self {
        Project {
            title: title.into(),
            image: image.into(),
            progress,
            total,
            label: label.map(|v| v.to_string()),
        }
    }
}
