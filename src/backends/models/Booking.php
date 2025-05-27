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
   public function createBooking(array $data)
{
    try {
        $stmt = $this->conn->prepare("
            CALL create_booking(
                :p_user_id,
                :p_room_id,
                :p_check_in,
                :p_check_out,
                :p_price_per_night,
                :p_nights,
                :p_discount,
                :p_tax,
                :p_sub_total,
                :p_total_amount,
                :p_status,
                :p_created_at,
                :p_updated_at
            )
        ");

        $stmt->bindValue(':p_user_id',         (int)   $data['user_id'],       PDO::PARAM_INT);
        $stmt->bindValue(':p_room_id',         (int)   $data['room_id'],       PDO::PARAM_INT);
        $stmt->bindValue(':p_check_in',                $data['check_in']);
        $stmt->bindValue(':p_check_out',               $data['check_out']);
        $stmt->bindValue(':p_price_per_night', (float) $data['price_per_night']);
        $stmt->bindValue(':p_nights',          (int)   $data['nights'],        PDO::PARAM_INT);
        $stmt->bindValue(':p_discount',        (float) $data['discount']);
        $stmt->bindValue(':p_tax',             (float) $data['tax_rate']);
        $stmt->bindValue(':p_sub_total',       (float) $data['sub_total']);
        $stmt->bindValue(':p_total_amount',    (float) $data['total_amount']);
        $stmt->bindValue(':p_status',                  $data['status']);
        
        $now = date('Y-m-d H:i:s');
        $stmt->bindValue(':p_created_at',             $now);
        $stmt->bindValue(':p_updated_at',             $now);

        $stmt->execute();
        $stmt->closeCursor();

        return ['success' => true, 'message' => 'Booking created successfully.'];
    } catch (PDOException $e) {
        return [
            'success' => false,
            'message' => 'Failed to create booking.',
            'error'   => $e->getMessage()
        ];
    }
}


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
        FROM " . $this->table . " bk
        JOIN rooms r ON bk.room_id = r.id
        JOIN buildings b ON r.building_id = b.id
        JOIN resorts res ON b.resort_id = res.id
        WHERE res.id = :resort_id");
        $stmt->bindParam(':resort_id', $resort_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookingByRoomId($room_id) {}


    public function update() {}

    public function destroy() {}

    public function getBookingsInRangeOf($data)
    {
        $query = "SELECT * FROM booking_full_summarry WHERE resort_id = :resort_id";

        if (!empty($data['check_in']) && !empty($data['check_out'])) {
            $query .= " AND check_in <= :check_out AND check_out >= :check_in ORDER BY check_in ASC";
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
    public function getBookingByRoomId($room_id) {}


    public function update() {}

    public function getBookingStats()
    {
        $stmt = $this->conn->prepare("SELECT * FROM booking_stats_view");
        $stmt->execute();
        return  $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function destroy() {}
}
