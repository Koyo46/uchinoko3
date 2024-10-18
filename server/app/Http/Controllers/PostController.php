<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with('user')->get();
        return response()->json($posts);
    }

    public function post(Request $request)
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->post('https://api.dify.ai/v1/chat-messages', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('DIFY_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'inputs' => ['mbti' => $request->user()->mbti, 'favorite' => $request->user()->favorite],
                'query' => 'あなたは飼い主の代わりに日々の思ったことや感じたこと、世界に発信したいことを呟くbotです。何か面白いことを呟いてください。',
                'response_mode' => 'blocking',
                'user' => $request->user()->id,
            ],
        ]);

        $responseBody = (string) $response->getBody();
        $responseBodyArray = json_decode($responseBody, true);
        Log::info($responseBodyArray);
        $content = $responseBodyArray['answer'] ?? ''; // 必要な部分だけを保存

        // 日本語に変換
        $content = mb_convert_encoding($content, 'UTF-8', 'auto');

        Post::create([
            'user_id' => $request->user()->id,
            'content' => $content,
            'conversation_id' => $responseBodyArray['conversation_id'],
        ]);

        return response()->json($response->getBody());
    }

    public function reply(Request $request)
    {
        $client = new \GuzzleHttp\Client();
        $response = $client->post('https://api.dify.ai/v1/chat-messages', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('DIFY_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'inputs' => ['mbti' => $request->user()->mbti, 'favorite' => $request->user()->favorite],
                'query' => 'いい感じに返信する',
                'response_mode' => 'blocking',
                'user' => $request->user()->id,
                'conversation_id' => $request->input('conversation_id'),
            ],
        ]);

        $responseBody = (string) $response->getBody();
        $responseBodyArray = json_decode($responseBody, true);
        Log::info($responseBodyArray);
        $content = $responseBodyArray['answer'] ?? ''; // 必要な部分だけを保存

        Post::create([
            'user_id' => $request->user()->id,
            'content' => $content,
            'conversation_id' => $responseBodyArray['conversation_id'],
        ]);

        return response()->json($response->getBody());
    }
}
