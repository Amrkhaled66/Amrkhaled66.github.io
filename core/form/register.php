<?php
// Check if the request contains data
if (isset($_POST)) {
    // Get the JSON data from the request
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);

    // Check if the action is sign-up
    if (isset($user["action"]) && $user["action"] === "signup") {
        // Handle sign-up request
        handle_signup($user);
    } elseif (isset($user["action"]) && $user["action"] === "signin") {
        // Handle sign-in request
        handle_signin($user);
    } else {
        // Invalid action
        echo json_encode(["success" => false, "error" => "Invalid action"]);
    }
}

// Function to handle sign-up request
function handle_signup($user)
{
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);

    $fName = $user["fName"];
    $lName = $user["lName"];
    $password = $user['pass'];

    $conn = mysqli_connect("localhost", "root", "", "users");

    function check_user_exists($phoneNumber, $conn)
    {
        $sql = "SELECT * FROM log WHERE phonenumber='$phoneNumber'";
        $result = mysqli_query($conn, $sql);

        return mysqli_num_rows($result) > 0;
    }

    if (check_user_exists($user['phoneNumber'], $conn)) {
        echo json_encode(["success" => false, "error" => "User with this phone number already exists."]);
    } else {

        $sql = "INSERT INTO log (F_name, L_name, phonenumber, Pass) VALUES ('$fName', '$lName', '{$user['phoneNumber']}', '$password')";

        if (mysqli_query($conn, $sql)) {
            // User registered successfully
            echo json_encode(["success" => true]);
        } else {
            // Registration failed
            echo json_encode(["success" => false, "error" => "Registration failed."]);
        }
    }
}

// Function to handle sign-in request
function handle_signin($user)
{
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);


    $password = $user['password'];
    $phone = $user['phoneNumber'];
    $conn = mysqli_connect("localhost", "root", "", "users");

    function check_user_exists($phoneNumber, $password, $conn)
    {
        $sql = "SELECT * FROM log WHERE phonenumber='$phoneNumber'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $user1 = mysqli_fetch_assoc($result);

            if ($user1) { // Check if user data is retrieved successfully
                $storedPassword = $user1['Pass'];
                if ($password == $storedPassword) {
                    return true;
                } else {
                    return false;
                }
            } else {
                // Handle error retrieving user data (e.g., database error)
                return false; // Or throw an exception
            }
        } else {
            // User not found in the database
            return false;
        }
    }

    if (check_user_exists($phone, $password, $conn)) {
        session_start();
        $_SESSION['user_id'] = $phone;
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "phonenumber or password is not correct"]);
    }
}
