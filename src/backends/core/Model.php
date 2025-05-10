<?php

require_once __DIR__ . '/../config/Database.php';
// NEXT TIME NALANG KITA E USE :< HENDE PALA FWEDE
class Model
{
    protected $conn;
    protected $table;
    protected $wheres = [];
    protected $bindings = [];

    public function __construct()
    {
        $db = new Database();
        $this->conn = $db->connect();
    }

    // Create a new record
    public function create(array $data)
    {
        $keys = array_keys($data);
        $fields = implode(", ", $keys);
        $placeholders = ":" . implode(", :", $keys);

        $sql = "INSERT INTO {$this->table} ($fields) VALUES ($placeholders)";
        $stmt = $this->conn->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }

        $stmt->execute();
        return $this->conn->lastInsertId();
    }

    // Update a record by id
    public function update($id, array $data)
    {
        $setParts = [];
        foreach ($data as $key => $value) {
            $setParts[] = "$key = :$key";
        }
        $setClause = implode(", ", $setParts);

        $sql = "UPDATE {$this->table} SET $setClause WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        $stmt->bindValue(":id", $id);

        return $stmt->execute();
    }

    // Delete a record by id
    public function delete($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM {$this->table} WHERE id = :id");
        $stmt->bindValue(":id", $id);
        return $stmt->execute();
    }

    // Find a record by id
    public function find($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table} WHERE id = :id LIMIT 1");
        $stmt->bindValue(":id", $id);
        $stmt->execute();

        $record = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($record) {
            foreach ($record as $key => $value) {
                $this->$key = $value;
            }
            return $this;
        }

        return null;
    }

    // Get all records
    public function all()
    {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Where condition
    public function where($column, $operator, $value = null)
    {
        if (func_num_args() == 2) {
            $value = $operator;
            $operator = '=';
        }

        $this->wheres[] = "$column $operator ?";
        $this->bindings[] = $value;

        return $this;
    }

    // Get records after where()
    public function get()
    {
        $sql = "SELECT * FROM {$this->table}";

        if (!empty($this->wheres)) {
            $sql .= " WHERE " . implode(' AND ', $this->wheres);
        }

        $stmt = $this->conn->prepare($sql);

        foreach ($this->bindings as $index => $value) {
            $stmt->bindValue($index + 1, $value);
        }

        $stmt->execute();

        // Clear after execution
        $this->wheres = [];
        $this->bindings = [];

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get first record after where()
    public function first()
    {
        $sql = "SELECT * FROM {$this->table}";

        if (!empty($this->wheres)) {
            $sql .= " WHERE " . implode(' AND ', $this->wheres);
        }

        $sql .= " LIMIT 1";

        $stmt = $this->conn->prepare($sql);

        foreach ($this->bindings as $index => $value) {
            $stmt->bindValue($index + 1, $value);
        }

        $stmt->execute();

        $record = $stmt->fetch(PDO::FETCH_ASSOC);

        // Clear after execution
        $this->wheres = [];
        $this->bindings = [];

        if ($record) {
            foreach ($record as $key => $value) {
                $this->$key = $value;
            }
            return $this;
        }

        return null;
    }

    // Pluck a column or columns
    public function pluck($column)
    {
        $sql = "SELECT {$column} FROM {$this->table}";

        if (!empty($this->wheres)) {
            $sql .= " WHERE " . implode(' AND ', $this->wheres);
        }

        $stmt = $this->conn->prepare($sql);

        foreach ($this->bindings as $index => $value) {
            $stmt->bindValue($index + 1, $value);
        }

        $stmt->execute();

        // Clear after execution
        $this->wheres = [];
        $this->bindings = [];

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    // BelongsTo relationship
    public function belongsTo($relatedModel, $foreignKey, $localKey = 'id')
    {
        $model = new $relatedModel();
        return $model->where($model->table . '.' . $localKey, $this->$foreignKey)->first();
    }

    // HasMany relationship
    public function hasMany($relatedModel, $foreignKey, $localKey = 'id')
    {
        $model = new $relatedModel();
        return $model->where($foreignKey, $this->$localKey)->get();
    }
}

/*

$booking = new Booking();

// Create
$id = $booking->create([
    'guest_id' => 1,
    'resort_id' => 5,
    'room_id' => 2,
    'reservation_start_date' => '2025-05-01',
]);

// Update
$booking->update($id, [
    'room_id' => 3,
]);

// Delete
$booking->delete($id);

// Find
$found = $booking->find(5);
echo $found->guest_id;

// Where and Get
$resortBookings = $booking->where('resort_id', 5)->get();
print_r($resortBookings);

// Where and First
$firstBooking = $booking->where('guest_id', 1)->first();
echo $firstBooking->room_id;

// Where and Pluck
$roomIds = $booking->where('resort_id', 5)->pluck('room_id');
print_r($roomIds);


-----------------------------------RELATIONSHIPS---------------------------------------

<?php

require_once 'Model.php';
require_once 'Resort.php';
require_once 'Room.php';

class Booking extends Model
{
    protected $table = 'bookings';

    public function resort()
    {
        return $this->belongsTo(Resort::class, 'resort_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}

*/
