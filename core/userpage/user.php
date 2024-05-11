<?php
// Step 1: Start the session
session_start();

$name = '';
$daysCome;
$allDays;
$startDate;
$endDate;
$nextClass = '';
$remainingDays;

// Step 2: Connect to the database and retrieve user data
// Replace 'your_host', 'your_username', 'your_password', and 'your_database' with your actual database credentials
$conn = mysqli_connect("localhost", "root", "", "users");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve user data from the database
if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    $sql = "SELECT* FROM userinfo WHERE phoneNumber = '$userId'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        $name = $user['name'];
        $daysCome = $user['daysCome'];
        $allDays = $user['allDays'];
        $startDate = $user['startDate'];
        $endDate = $user['endDate'];
        $remainingDays = $user['remainingDays'];
        $nextClass = $user['nextClass'];
    } else {
        echo "User data not found!";
    }
} else {
    echo "User not logged in!";
}

// Step 3: Display the user data on the HTML page
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoreValues Gym</title>
    <!-- the style shhet -->
    <link rel="stylesheet" href="../core.css">
    <link rel="stylesheet" href="user.css">
    <!-- the icon -->
    <link rel="icon" href="../images/core.png">
    <script defer src="user.js"></script>

    <!-- || FONT AWSOME LIBARAY FOR ICONS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>

<body>
    <header class="header__div user__header">
        <div class="container">
            <div class="img__div">
                <img src="../images/core2.png" alt="CoreValues Gym">
            </div>
            <button class="user__btn"> <i class="fa-solid fa-user"></i></button>
            <div class="header__dropdown hidden">
                <ul class="dropdown__list">
                    <li>
                        <a href="logout.php">Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <div class="parent">
        <div class="div1 parent__div">
            <h3>Hello
                <?php echo "$name" ?>
            </h3>
            <div class="attendance">
                <p>Workout Completion</p>
                <div class="prograss__bar">
                    <div class="inner__prgrassbar"></div>
                </div>
                <p>You come <span class="days_num"> <?php echo "$daysCome" ?> </span> day from

                    <span class="days_num"> <?php echo "$allDays" ?> </span> day
                </p>
            </div>
        </div>

        <div class="div3 parent__div">
            <h3>Your membership end at: <span class="days_num"> <?php echo "$endDate" ?> </span> </h3>
        </div>
        <div class="div2 parent__div">
            <h3>You start at: </h3>
            <p> <span class="days_num"> <?php echo "$startDate" ?> </span> </p>
        </div>
        <div class="div4 parent__div">
            <h3>Your remaing Days: <span class="days_num"> <?php echo "$remainingDays" ?> </span> </h3>
        </div>
        <div class="div5 parent__div">
            <h3>Your Next Class: <span class="days_num"> <?php echo "$nextClass" ?> </span> </h3>
        </div>
    </div>
</body>

</html>