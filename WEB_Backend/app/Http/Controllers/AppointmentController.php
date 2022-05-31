<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{

    public function getAllAppointments () {
        $appointments = Appointment::with(['user', 'offer'])->get();
        return $appointments;
    }

    public function findAppointmentById(string $id):Appointment{
        $appointment = Appointment::where('id', $id)
            ->with(['user', 'offer'])
            ->first();
        return $appointment;
    }

    /**
     * this function update an appointment of an offer by changing the state from isAvailable=true(1) to
     * isAvailable = false (0). the function is used by booking an appointment
     * Moreover the function sync all entries into the pivot table
     * @param Request $request: describes the Object from the Client (AppointmentUser) which include (appointment_id, user_id)
     * @return JsonResponse
     */
    public function updateAppointment (Request $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $appointment = Appointment::with(['offer', 'user'])
                ->where('id', $request['appointment_id'])->first();

            $appointment['isAvailable'] = 0;

            //update users
            $ids = [];
            array_push($ids,$request['user_id']);
            //table
            $appointment->user()->sync($ids);

            if ( $appointment != null) {
                $appointment->update($request->all());
            }

            $appointment->save();

            DB::commit();
            $appointment1 = Appointment::with(['offer', 'user'])
                ->where('id', $request['appointment_id'])->first();
            // return a vaild http response
            return response()->json( $appointment1 , 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating appointment failed: " . $e->getMessage(), 420);
        }
    }
}
