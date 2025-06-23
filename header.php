<?php
session_start();
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.html");
    exit;
}
$name = htmlspecialchars($_SESSION['user_name']);
?>

<!-- Inject into existing header.html -->
<?php
$html = file_get_contents("header.html");
$html = str_replace(
    '<div class="top-bar-content">',
    '<div class="top-bar-content">
        <span class="top-bar-item">Welcome, ' . $name . '</span>
        <a href="logout.php" class="top-bar-item"><i class="fas fa-sign-out-alt"></i> Logout</a>',
    $html
);
echo $html;
?>
