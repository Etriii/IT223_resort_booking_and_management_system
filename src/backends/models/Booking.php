<?php

require_once __DIR__ . '/../config/Database.php';

class Booking
{
    private $conn;
    private $table = 'bookings';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getBookings()
    {
        $stmt = $this->conn->prepare("SELECT * FROM booking_full_summarry WHERE resort");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create() {}

    public function getBookingId($id) {}
    public function getBookingByResortId($resort_id)
    {
        $stmt = $this->conn->prepare("
    SELECT 
        u.username                          AS Name,
        res.name                            AS Resort_Name,
        b.name                              AS Building_Name, 
        b.floor_count                       AS Floor_Count,
        rt.name                             AS Room_Type,
        DATEDIFF(bk.check_out, bk.check_in) AS No_of_Nights,
        FORMAT(bk.total_amount, 0)          AS Amount
    FROM " . $this->table . " bk
    JOIN users u        ON bk.user_id      = u.id
    JOIN rooms r        ON bk.room_id      = r.id
    JOIN buildings b    ON r.building_id   = b.id
    JOIN resorts res    ON b.resort_id     = res.id
    JOIN room_types rt  ON r.room_type_id  = rt.id
    WHERE res.id = :resort_id
    ORDER BY bk.check_in DESC
");
        $stmt->bindParam(':resort_id', $resort_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getTotalBookingsByResortId($resort_id)
    {
        $stmt = $this->conn->prepare("SELECT 
        FORMAT(SUM(bk.total_amount), 0) AS Total_Amount
        FROM " . $this->table . " bk
        JOIN rooms r ON bk.room_id = r.id
        JOIN buildings b ON r.building_id = b.id
        JOIN resorts res ON b.resort_id = res.id
        WHERE res.id = :resort_id");
        $stmt->bindParam(':resort_id', $resort_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTotalAmountResortId($resort_id)
{
    $sql = "
        SELECT 
            DATE(bk.check_in) AS check_in,
            bk.total_amount
        FROM ".$this->table." bk
        JOIN rooms r ON bk.room_id = r.id
        JOIN resorts res ON r.resort_id = res.id
        WHERE res.id = :resort_id AND bk.status = 'Completed'
    
    ";

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(':resort_id', $resort_id, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Transform result to desired format
    // $formatted = [];
    // foreach ($results as $row) {
    //     $month = substr($row['CheckInMonth'], 0, 3); // Extract short month name only
    //     $cost = (int)str_replace(',', '', $row['TotalAmount']); // Remove commas, cast to int

    //     $formatted[] = [
    //         'label' => $month,
    //         'cost' => $cost,
    //     ];
    // }

    // return $formatted;
}

    public function getBookingByRoomId($room_id) {}


    public function update() {}

    public function destroy() {}

    public function getBookingsInRangeOf($data)
    {
        $query = "SELECT * FROM booking_full_summarry WHERE resort_id = :resort_id";

        if (!empty($data['check_in']) && !empty($data['check_out'])) {
            $query .= " AND check_in <= :check_out AND check_out >= :check_in";
        }

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':resort_id', $data['resort_id']);

        if (!empty($data['check_in']) && !empty($data['check_out'])) {
            $stmt->bindParam(':check_in', $data['check_in']);
            $stmt->bindParam(':check_out', $data['check_out']);
        }

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookingStats()
    {
        $stmt = $this->conn->prepare("SELECT * FROM booking_stats_view");
        $stmt->execute();
        return  $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
