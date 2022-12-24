<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FootballMatchCollection extends ResourceCollection
{

  public function toArray($request)
  {
    return [
      'matches' => FootballMatchResource::collection($this->collection),
      'pagination' => [
        'total' => $this->total(),
        'count' => $this->count(),
        'per_page' => $this->perPage(),
        'current_page' => $this->currentPage(),
        'total_pages' => $this->lastPage(),
        'first_page_url' => $this->onFirstPage(),
        'last_page_url' => $this->lastPage(),
        'next_page_url' => $this->nextPageUrl(),
        'prev_page_url' => $this->previousPageUrl()
      ],
    ];
  }
}
