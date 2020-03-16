import requests


def get_static_map_url(address: str, api_key: str):
    mapApiURL: str = "https://maps.googleapis.com/maps/api/staticmap";
    scale: int = 2;
    zoom: int = 16;
    width: int = 380;
    height: int = 280;
    mapStyle: str = "style=feature:poi|element:all|visibility:simplified"
    marker: str = f"markers=size:normal|color:red|{address}"
    mapStaticURL: str = f"{mapApiURL}?center={address}&zoom={zoom}&size={width}x{height}&scale={scale}&{marker}&{mapStyle}&key={api_key}"
    return mapStaticURL;


def main():
    map_path = get_static_map_url("2 Park Street, Sydney", "REDACTED")
    print(map_path)

    with open('location_map.png', 'wb') as f:
        f.write(requests.get(map_path).content)


if __name__ == "__main__":
    main()
