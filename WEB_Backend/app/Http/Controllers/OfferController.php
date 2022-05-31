<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Category;
use App\Models\Offer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OfferController extends Controller
{

    public function index () {
        /*$offers = Offer::all();
        return view('offers.index',compact('offers'));*/
        $offers = Offer::with(['appointments', 'user', 'category'])->get();
        return $offers;
    }


    public function show ($id) {
        $offer = Offer::find($id);
        return view('offers.show',compact('offer'));
    }

    public function findById(string $id) : Offer {
        $offer = Offer::where('id', $id)
            ->with(['appointments', 'user', 'category'])
            ->first();
        return $offer;
    }

    public function checkId(string $id)
    {
        $offer = Offer::where('id', $id)->first();
        return $offer != null ? response()->json(true, 200) : response()->json(false,
            200);
    }

    public function findBySearchTerm(string $searchTerm) {
        $offer = Offer::with(['appointments', 'user', 'category'])
            ->where('title', 'LIKE', '%' . $searchTerm. '%')
            ->orWhere('description' , 'LIKE', '%' . $searchTerm. '%')
            /* search term in authors name */
            ->orWhereHas('user', function($query) use ($searchTerm) {
                $query->where('firstName', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('lastName', 'LIKE', '%' . $searchTerm. '%');
            })->orWhereHas('category', function($query) use ($searchTerm) {
                $query->where('title', 'LIKE', '%' . $searchTerm. '%');
            })->get();
        return $offer;
    }



    /**
     * create new Book
     */
    public function save(Request $request) : JsonResponse {
        //$request = $this->parseRequest($request);
        /*+
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        DB::beginTransaction();
        try {


            $offer = Offer::make($request->all());

            if (isset($request['category']) ) {
                 $category =
                        Category::firstOrCreate(['title'=>$request['category']
                        ]);
                $offer->category()->associate($category);
            }


            //save appointments
            $offer->save();
            if (isset($request['appointments']) && is_array($request['appointments'])) {
                foreach ($request['appointments'] as $appoint) {
                    $appointment =
                        Appointment::firstOrNew(['date'=>$appoint['date'],'begin'=>$appoint['begin'],'end'=>$appoint['end'], 'isAvailable'=>$appoint['isAvailable']]);
                    $offer->appointments()->save($appointment);
                }
            }

            DB::commit();

            $newOffer = Offer::where('id', $offer->id)
                ->with(['appointments', 'user', 'category'])
                ->first();

            // return a vaild http response
            return response()->json($newOffer, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving offer failed: " . $e->getMessage(), 420);
        }
    }


    /**
     * modify / convert values if needed
     */
     private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
         $date = new \DateTime($request->published);
         $request['published'] = $date;
         return $request;
     }


    public function update(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $offer = Offer::with(['appointments', 'user', 'category'])
                ->where('id', $id)->first();
            if ($offer != null) {

                //update category
                if (isset($request['category']) ) {
                    $category =
                        Category::firstOrCreate(['title'=>$request['category']
                        ]);
                    $offer->category()->associate($category);
                }

                $offer->update($request->all());

                //delete all old appointments
                $offer->appointments()->delete();

                // save appointments
                if (isset($request['appointments']) && is_array($request['appointments'])) {
                    foreach ($request['appointments'] as $appoint) {
                        $appointment =Appointment::firstOrNew(['date'=>$appoint['date'],'begin'=> $appoint['begin'],
                            'end'=>$appoint['end'], 'isAvailable'=>$appoint['isAvailable']]);
                        $offer->appointments()->save($appointment);
                    }
                }
            }
            DB::commit();
            $offer1 = Offer::with(['appointments', 'user', 'category'])
                ->where('id', $id)->first();
            // return a vaild http response
            return response()->json($offer1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating offer failed: " . $e->getMessage(), 420);
        }
    }



    public function delete(string $id) : JsonResponse
    {
        $offer = Offer::where('id', $id)->first();
        if ($offer != null) {
            $offer->delete();
        }
        else
            throw new \Exception("offer couldn't be deleted - it does not exist");
        return response()->json('offer (' . $id . ') successfully deleted', 200);
    }




    public function updateMessage(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $offer = Offer::with(['appointments', 'user', 'category'])
                ->where('id', $id)->first();
            if ($offer != null) {

                $offer->update($request->all());

                $offer->appointments()->delete();

                // save appointments
                if (isset($request['appointments']) && is_array($request['appointments'])) {
                    foreach ($request['appointments'] as $appoint) {
                        $appointment =Appointment::firstOrNew(['date'=>$appoint['date'],'begin'=> $appoint['begin'],'end'=>$appoint['end'],
                            'isAvailable' => $appoint['isAvailable']]);
                        $offer->appointments()->save($appointment);
                       // $appoint->user()->sync($request['user_id']);
                    }
                }


            }
            DB::commit();
            $offer1 = Offer::with(['appointments', 'user', 'category'])
                ->where('id', $id)->first();
            // return a vaild http response
            return response()->json($offer1, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating offer failed: " . $e->getMessage(), 420);
        }
    }

}
