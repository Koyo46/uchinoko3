<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();
        $user->mbti = $request->mbti;
        $user->favorite = $request->favorite;
        $user->save();
        return response()->json($user);
    }

    public function get()
    {
        $user = Auth::user();
        return response()->json($user);
    }
}
