<?php
// Database credentials
$host = 'localhost';
$db = 'meghalaya_digital_portal';
$user = 'root';
$pass = ''; // Set your MySQL root password if any

// Create database connection
$conn = new mysqli($host, $user, $pass, $db);

// Check for connection errors
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Get and sanitize POST data
$name = htmlspecialchars(trim($_POST['name']));
$email = htmlspecialchars(trim($_POST['email']));
$phone = htmlspecialchars(trim($_POST['phone']));
$category = htmlspecialchars(trim($_POST['category']));
$message = htmlspecialchars(trim($_POST['message']));

// Validate required fields
if (empty($name) || empty($email) || empty($category) || empty($message)) {
    die("Please fill all required fields.");
}

// Prepare SQL insert statement
$stmt = $conn->prepare("INSERT INTO grievances (name, email, phone, category, message) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $phone, $category, $message);

// Execute and check result
if ($stmt->execute()) {
    echo "<h2 style='text-align:center; color:green;'>Grievance submitted successfully.</h2>";
    echo "<p style='text-align:center;'><a href='header.html'>← Back to Home</a></p>";
} else {
    echo "<h2 style='text-align:center; color:red;'>Error submitting grievance.</h2>";
    echo "<p>Error: " . $stmt->error . "</p>";
}

// Close connections
$stmt->close();
$conn->close();
?>
