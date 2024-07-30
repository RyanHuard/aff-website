import os

# Read the player names from the text file
with open('players.txt', 'r') as file:
    player_names = file.readlines()

# Remove newline characters and handle names with spaces
player_names = [name.strip() for name in player_names]
player_names = [name.split(' ', 1) for name in player_names]  # Split only at the first space

# Rename pictures based on player names
picture_files = sorted(file for file in os.listdir() if file.lower().endswith('.png'))

for idx, (first_name, last_name) in enumerate(player_names):
    new_picture_name = f'{first_name}_{last_name}.png'
    picture_index = str(idx).zfill(4)  # Convert index to a 4-digit string

    original_picture_path = f'{picture_index} .png'
    new_picture_path = new_picture_name  # Directly use the new filename

    # Remove any leading or trailing spaces from the filename
    picture_index_cleaned = f'{picture_index} .png'.strip()

    print(f'Checking picture: {picture_index_cleaned}')
    try:
        if picture_index_cleaned in picture_files:
            os.rename(original_picture_path, new_picture_path)
            print(f'Renamed picture for {first_name} {last_name}')
        else:
            print(f'Picture not found for {first_name} {last_name}')
    except FileExistsError:
        print(f'Picture with name {new_picture_name} already exists.')
        # Handle this case as needed

print('Renaming process complete.')
