defmodule DeliciousElixir.Pagination do
  import Ecto.Query
  import Plug.Conn

  def parse_params(params) do
    offset = Dict.get(params, "offset", "0") |> String.to_integer
    limit = Dict.get(params, "limit", "10") |> String.to_integer

    %{
      "offset" => offset,
      "limit" => limit,
      "total_count" => 0,
    }
  end

  def paginate(query, page_params) do
    from l in query,
      offset: ^page_params["offset"],
      limit: ^page_params["limit"]
  end


  def build_uri(uri, key, value) do
    query = uri.query
          |> URI.decode_query
          |> Map.put(key, value)
          |> URI.encode_query

    %URI{uri | query: query}
  end

  def build_next_uri(uri, page_params) do
    offset = page_params["offset"]+page_params["limit"]
    if offset < page_params["total_count"] do
      build_uri(uri, "offset", offset) |> URI.to_string
    else
      ""
    end
  end

  def build_prev_uri(uri, page_params) do
    offset = page_params["offset"]-page_params["limit"]
    if offset >= 0 do
      build_uri(uri, "offset", offset) |> URI.to_string
    else
      ""
    end
  end

  def headers(conn, page_params) do
    uri = %URI{scheme: Atom.to_string(conn.scheme),
               host: conn.host,
               port: conn.port,
               path: conn.request_path,
               query: conn.query_string}

    next_uri = build_next_uri(uri, page_params)
    prev_uri = build_prev_uri(uri, page_params)

    conn
    |> put_resp_header("offset", Integer.to_string(page_params["offset"]))
    |> put_resp_header("limit", Integer.to_string(page_params["limit"]))
    |> put_resp_header("total", Integer.to_string(page_params["total_count"]))
    |> put_resp_header("link", URI.to_string(uri))
    |> put_resp_header("next", next_uri)
    |> put_resp_header("prev", prev_uri)
  end
end
