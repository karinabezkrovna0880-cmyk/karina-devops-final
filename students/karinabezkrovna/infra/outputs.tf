output "instance_ip" {
  description = "Public IP of EC2"
  value       = aws_instance.app_server.public_ip
}
