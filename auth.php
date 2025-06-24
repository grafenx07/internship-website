<?php
session_start();

// Database connection
$conn = new mysqli("localhost", "root", "", "meghalaya_digital_portal");

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Check if action is set
if (!isset($_POST['action'])) {
    echo json_encode(["success" => false, "message" => "No action specified."]);
    exit;
}

$action = $_POST['action'];

if ($action === 'login') {
    // Required fields
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        echo json_encode(["success" => false, "message" => "Email and password required."]);
        exit;
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare statement to fetch user by email
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    // Verify password
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['loggedin'] = true;
        $_SESSION['user_name'] = $user['name'];

        echo json_encode([
            "success" => true,
            "message" => "Login successful!",
            "redirect" => "header.php"
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid email or password."]);
    }

    $stmt->close();

} elseif ($action === 'signup') {
    // Required fields
    $required = ['name', 'email', 'password', 'phone', 'department'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            echo json_encode(["success" => false, "message" => ucfirst($field) . " is required."]);
            exit;
        }
    }

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // hash password securely
    $phone = $_POST['phone'];
    $department = $_POST['department'];

    // Check if email already exists
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already registered."]);
    } else {
        // Insert new user
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone, department) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $email, $password, $phone, $department);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Registration successful!"]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Registration failed: " . $stmt->error // shows actual DB error
            ]);
        }

        $stmt->close();
    }

    $check->close();
}

$conn->close();
?>
