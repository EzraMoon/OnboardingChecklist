from website import create_app

app = create_app()

#driver code
if __name__ == '__main__':
    globalUser = "Testing"
    app.run(debug=True, port=3003)