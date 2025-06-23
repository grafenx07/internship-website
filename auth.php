<?php
session_start();
$conn = new mysqli("localhost", "root", "", "gov_portal");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$action = $_POST['action'];

if ($action === 'login') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['loggedin'] = true;
        $_SESSION['user_name'] = $user['name'];
        echo json_encode(["success" => true, "message" => "Login successful!", "redirect" => "header.php"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid email or password."]);
    }
} elseif ($action === 'signup') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $phone = $_POST['phone'];
    $department = $_POST['department'];

    $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone, department) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $password, $phone, $department);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Registration successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Email already exists or error occurred."]);
    }
}

$conn->close();
?>
