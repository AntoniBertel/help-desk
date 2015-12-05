package grsu.helpdesk.service

public static success(String message, String token) {
    return """{"status": "success", "message" : "${message}", "token": "${token}"}"""
}

public static failure(String message, String token) {
    return """{"status": "failure", "message" : "${message}", "token": "${token}"}"""
}

