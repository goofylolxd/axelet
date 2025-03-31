<?php

// Define the upload directory
$upload_dir = "uploads/";

// Ensure the upload directory exists
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Set the allowed file types (e.g., PNG, JPEG, GIF)
$allowed_types = ['image/png', 'image/jpeg', 'image/gif'];

// Check if a file was uploaded
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    // Get file information
    $file_tmp_name = $_FILES['file']['tmp_name'];
    $file_name = basename($_FILES['file']['name']);
    $file_type = $_FILES['file']['type'];

    // Validate file type
    if (!in_array($file_type, $allowed_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type.']);
        exit;
    }

    // Generate a unique filename for the uploaded file
    $new_file_name = time() . "_" . $file_name;

    // Set the destination path
    $file_path = $upload_dir . $new_file_name;

    // Move the uploaded file to the target directory
    if (move_uploaded_file($file_tmp_name, $file_path)) {
        // Return success with the file URL (now using ss.axelet.lol as the base URL)
        $file_url = "https://ss.axelet.lol/" . $upload_dir . $new_file_name;
        echo json_encode(['success' => true, 'url' => $file_url]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No file uploaded or an error occurred.']);
}
?>
