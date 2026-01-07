<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Models\Category;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function index(Request $request)
    {
        $query = Dish::with(['category', 'allergens', 'variants']);

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->disponible !== null) {
            $query->where('disponible', $request->boolean('disponible'));
        }

        return response()->json($query->paginate(15));
    }

    public function show(Dish $dish)
    {
        return response()->json($dish->load(['category', 'allergens', 'variants']));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0.01',
            'ingredients' => 'nullable|json',
            'image_url' => 'nullable|url',
            'disponible' => 'boolean',
        ]);

        $dish = Dish::create($validated);

        return response()->json($dish, 201);
    }

    public function update(Request $request, Dish $dish)
    {
        $validated = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'nom' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'prix' => 'nullable|numeric|min:0.01',
            'ingredients' => 'nullable|json',
            'image_url' => 'nullable|url',
            'disponible' => 'nullable|boolean',
        ]);

        $dish->update($validated);

        return response()->json($dish);
    }

    public function destroy(Dish $dish)
    {
        $dish->delete();

        return response()->json(['message' => 'Plat supprimé']);
    }

    public function byCategory(Category $category)
    {
        return response()->json($category->dishes()->with('variants', 'allergens')->get());
    }

    public function toggleAvailability(Dish $dish)
    {
        $dish->update(['disponible' => !$dish->disponible]);

        return response()->json($dish);
    }
}
