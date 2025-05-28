<?php

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../core/Model.php';

class TriggerLog
{
    private $conn;
    private $table = 'trigger_logs';

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    public function getTriggerLogs()
    {
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    // public function getLogs($data)
    // {
    //     $sql = "
    //     SELECT * FROM {$this->table}
    //     WHERE `table` = :d_table
    //     ";

    //     $params = [
    //         ':d_table' => $data['table']
    //     ];

    //     // Optionally add resort_id filter
    //     if (!empty($data['resort_id'])) {
    //         $sql .= " AND resort_id = :resort_id";
    //         $params[':resort_id'] = $data['resort_id'];
    //     }

    //     // Optionally add date filters
    //     if (!empty($data['start_date']) && !empty($data['end_date'])) {
    //         $sql .= " AND created_at BETWEEN :start_date AND :end_date";
    //         $params[':start_date'] = $data['start_date'];
    //         $params[':end_date'] = $data['end_date'];
    //     }

    //     $stmt = $this->conn->prepare($sql);

    //     foreach ($params as $key => $value) {
    //         $stmt->bindValue($key, $value);
    //     }

    //     $stmt->execute();

    //     return $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     // $sql = "SELECT * FROM {$this->table} WHERE `table` = :d_table";
    //     // $stmt = $this->conn->prepare($sql);
    //     // $stmt->bindValue(':d_table', 'resorts');
    //     // $stmt->execute();
    //     // return $stmt->fetchAll(PDO::FETCH_ASSOC);
    // }


    public function getLogs($data)
    {
        $data['table'] = trim($data['table']); // normalize input
        $sql = "SELECT * FROM {$this->table} WHERE `table` = :d_table";
        $params = [':d_table' => $data['table']];

        if (!empty($data['resort_id'])) {
            $sql .= " AND `resort_id` = :resort_id";
            $params[':resort_id'] = $data['resort_id'];
        }

        if (!empty($data['start_date']) && !empty($data['end_date'])) {
            $sql .= " AND created_at BETWEEN :start_date AND :end_date";
            $params[':start_date'] = $data['start_date'] . ' 00:00:00';
            $params[':end_date'] = $data['end_date'] . ' 23:59:59';
        }

        $stmt = $this->conn->prepare($sql);

        foreach ($params as $key => $value) {   
            $stmt->bindValue($key, $value);
        }

        if (!$stmt->execute()) {
            print_r($stmt->errorInfo());
            return [];
        }

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }



    // public function getLogs(array $data)
    // {
    //     $table = $data['table'];
    //     $startDate = $data['start_date'];
    //     $endDate = $data['end_date'];
    //     $resortId = $data['resort_id'] ?? null;

    //     $sql = $this->buildLogQuery($table);

    //     $stmt = $this->conn->prepare($sql);

    //     // $stmt->bindParam(':table', $table);
    //     $stmt->bindParam(':start_date', $startDate);
    //     $stmt->bindParam(':end_date', $endDate);

    //     if (strpos($sql, ':resort_id') !== false) {
    //         if ($resortId === null) {
    //             throw new InvalidArgumentException("resort_id is required for table '$table'");
    //         }
    //         $stmt->bindParam(':resort_id', $resortId);
    //     }

    //     $stmt->execute();

    //     return $stmt->fetchAll(PDO::FETCH_ASSOC);
    // }

    // private function buildLogQuery(string $table): string
    // {
    //     // Tables with direct resort_id column
    //     $directResortTables = ['resorts', 'buildings', 'resort_amenities', 'resort_events', 'reviews', 'bookmarks'];

    //     // Tables with payments join path
    //     $paymentTables = ['payments', 'payment_submissions'];

    //     switch ($table) {
    //         case 'bookings':
    //             return "
    //             SELECT t.* FROM trigger_logs t
    //             JOIN bookings b ON t.affected_id = b.id
    //             JOIN rooms r ON b.room_id = r.id
    //             JOIN buildings bld ON r.building_id = bld.id
    //             WHERE t.table = 'bookings'
    //             AND bld.resort_id = :resort_id
    //             AND t.created_at BETWEEN :start_date AND :end_date
    //         ";

    //         case 'resorts':
    //             return "
    //             SELECT * FROM trigger_logs t
    //             JOIN resorts r ON t.affected_id = r.id
    //             WHERE t.table = 'resorts'
    //             AND r.id = :resort_id AND t.created_at BETWEEN :start_date AND :end_date
    //         ";

    //         case 'booking_details':
    //             return "
    //             SELECT t.* FROM trigger_logs t
    //             JOIN booking_details bd ON t.affected_id = bd.id
    //             JOIN bookings b ON bd.booking_id = b.id
    //             JOIN rooms r ON b.room_id = r.id
    //             JOIN buildings bld ON r.building_id = bld.id
    //             WHERE t.table = 'booking_details'
    //             AND bld.resort_id = :resort_id
    //             AND t.created_at BETWEEN :start_date AND :end_date
    //         ";

    //         case 'user_roles':
    //             return "
    //             SELECT t.* FROM trigger_logs t
    //             JOIN user_roles ur ON t.affected_id = ur.id
    //             WHERE t.table = 'user_roles'
    //             AND (ur.resort_id = :resort_id OR ur.resort_id IS NULL)
    //             AND t.created_at BETWEEN :start_date AND :end_date
    //         ";

    //         case 'notifications':
    //         case 'amenities_category':
    //             // No resort_id needed
    //             return "
    //             SELECT t.* FROM trigger_logs t
    //             WHERE t.table = :table
    //             AND t.created_at BETWEEN :start_date AND :end_date
    //         ";

    //         default:
    //             if (in_array($table, $directResortTables, true)) {
    //                 return "
    //                 SELECT t.* FROM trigger_logs t
    //                 JOIN {$table} x ON t.affected_id = x.id
    //                 WHERE t.table = :table
    //                 AND x.resort_id = :resort_id
    //                 AND t.created_at BETWEEN :start_date AND :end_date
    //             ";
    //             }

    //             if (in_array($table, $paymentTables, true)) {
    //                 return "
    //                 SELECT t.* FROM trigger_logs t
    //                 JOIN {$table} p ON t.affected_id = p.id
    //                 JOIN bookings b ON p.booking_id = b.id
    //                 JOIN rooms r ON b.room_id = r.id
    //                 JOIN buildings bld ON r.building_id = bld.id
    //                 WHERE t.table = :table
    //                 AND bld.resort_id = :resort_id
    //                 AND t.created_at BETWEEN :start_date AND :end_date
    //             ";
    //             }

    //             // Fallback - no resort filter
    //             return "
    //             SELECT t.* FROM trigger_logs t
    //             WHERE t.table = :table
    //             AND t.created_at BETWEEN :start_date AND :end_date
    //         ";
    //     }
    // }
}
