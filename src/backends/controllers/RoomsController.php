<?php

require_once __DIR__ . '/../models/Room.php';
require_once __DIR__ . '/../core/Request.php';

class RoomsController
{
    private $roomModel;

    public function __construct()
    {
        $this->roomModel = new Room();
    }

    public function getRooms(): void
    {
        echo json_encode($this->roomModel->getRooms());
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

            $overlappingReservations = $this->roomModel->getOverlappingReservations(
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

    public function getAvailableRoomsByBuildingId(Request $request)
    {

        if (!$request->get('building_id') || !$request->get('check_in') || !$request->get('check_out')) {
            echo "Missing required parameters.";
            return;
        }

        // http://localhost:8000/api.php?controller=Rooms&action=getAvailableRoomsByBuildingId&building_id=1&check_in=2025-12-01&check_out=2025-12-05
        echo json_encode($this->roomModel->getAvailableRooms([
            'building_id' => $request->get('building_id'),
            'check_in' => $request->get('check_in'),
            'check_out' => $request->get('check_out'),
        ]));
    }

    public function getRoomsByBuildingId(Request $request): void
    {
        $building_id = $request->get('building_id');
        $start_date = $request->get('start_date');
        $end_date = $request->get('end_date');

        $rooms = $this->roomModel->getRoomsByBuildingId($building_id);

        if (!empty($start_date) && !empty($end_date)) {
            $db = new Database();
            $conn = $db->connect();

            $bookingsStmt = $conn->prepare("
                SELECT room_id FROM bookings
                WHERE 
                    (check_in BETWEEN :check_in AND :check_out 
                    OR check_out BETWEEN :check_in AND :check_out
                    OR :check_in BETWEEN check_in AND check_out
                    OR :check_out BETWEEN check_in AND check_out)
            ");
            $bookingsStmt->bindParam(':check_in', $start_date, PDO::PARAM_STR);
            $bookingsStmt->bindParam(':check_out', $end_date, PDO::PARAM_STR);
            $bookingsStmt->execute();

            $bookedRoomIds = array_column($bookingsStmt->fetchAll(PDO::FETCH_ASSOC), 'room_id');

            $rooms = array_filter($rooms, function ($room) use ($bookedRoomIds) {
                return !in_array($room['id'], $bookedRoomIds);
            });

            $rooms = array_values($rooms);
        }

        echo json_encode($rooms);
    }
}
