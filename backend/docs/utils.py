def read_file(file_path):
    """
    Read a file as a string.

    Parameters:
        - file_path (str): The path to the file to read.

    Returns:
        - str: The contents of the file as a string.
    """
    with open(file_path, "r") as f:
        return f.read()
