<?php

require_once __DIR__ . '/../models/Room.php';
require_once __DIR__ . '/../core/Request.php';

class RoomsController
{
    private $eventsModel;

    public function __construct()
    {
        $this->eventsModel = new Room();
    }

    public function getRooms(): void
    {
        echo json_encode($this->eventsModel->getRooms());
    }

    public function getAvailableRooms(Request $request): void
    {
        $resort_id = $request->get('resort_id');
        $check_in = $request->get('check_in');
        $check_out = $request->get('check_out');

        if (!$resort_id || !$check_in || !$check_out) {
            echo json_encode(['error' => 'Missing required parameters']);
            return;
        }

        try {
            $parsedCheckIn = new DateTime($check_in);
            $parsedCheckOut = new DateTime($check_out);

            $overlappingReservations = $this->roomsModel->getOverlappingReservations(
                $resort_id,
                $parsedCheckIn->format('Y-m-d'),
                $parsedCheckOut->format('Y-m-d')
            );

            $bookedRoomIDs = array_map(function ($reservation) {
                return $reservation['room_id'];
            }, $overlappingReservations);

            $availableRooms = array_filter($rooms, function ($room) use ($bookedRoomIDs) {
                return !in_array($room['room_id'], $bookedRoomIDs);
            });

            echo json_encode(array_values($availableRooms));
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    public function getRoomsByBuildingId(Request $request): void
    {
        $building_id = $request->get('building_id');
        $start_date = $request->get('start_date');
        $end_date = $request->get('end_date');
        $status = ucfirst(strtolower(trim($request->get('status'))));

        $rooms = $this->eventsModel->getRoomsByBuildingId($building_id);

        if (!empty($start_date) && !empty($end_date)) {
            $db = new Database();
            $conn = $db->connect();

            $sql = "
                SELECT room_id FROM bookings
                WHERE
                    status IN ('Confirmed', 'Pending')  -- Corrected to use IN for multiple values
                    AND
                    (check_in BETWEEN :check_in AND :check_out
                    OR check_out BETWEEN :check_in AND :check_out
                    OR :check_in BETWEEN check_in AND check_out
                    OR :check_out BETWEEN check_in AND check_out)
            ";

            if (!empty($status) && in_array($status, ['Confirmed', 'Pending'], true)) {
                $sql .= " AND status = :status";
            }

            $bookingsStmt = $conn->prepare($sql);
            $bookingsStmt->bindParam(':check_in', $start_date, PDO::PARAM_STR);
            $bookingsStmt->bindParam(':check_out', $end_date, PDO::PARAM_STR);

            if (!empty($status) && in_array($status, ['Confirmed', 'Pending'], true)) {
                $bookingsStmt->bindParam(':status', $status, PDO::PARAM_STR);
            }

            $bookingsStmt->execute();

            $bookedRoomIds = array_column($bookingsStmt->fetchAll(PDO::FETCH_ASSOC), 'room_id');

            $rooms = array_filter($rooms, function ($room) use ($bookedRoomIds) {
                return !in_array($room['id'], $bookedRoomIds);
            });

            $rooms = array_values($rooms);
        }

        echo json_encode($rooms);
    }


    public function getRoomById(Request $request): void
    {
        $id = $request->get('id');
        if (!$id) {
            echo json_encode(['error' => 'Missing room ID']);
            return;
        }

        $room = $this->eventsModel->getRoomById($id);
        if ($room) {
            echo json_encode($room);
        } else {
            echo json_encode(['error' => 'Room not found']);
        }
    }
}
