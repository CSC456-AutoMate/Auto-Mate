terraform {
  backend "s3" {
    bucket = "terraform-state-automate-nightfall28"
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}