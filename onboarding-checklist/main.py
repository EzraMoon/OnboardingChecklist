from website import create_app

app = create_app()

#driver code to run flask app
if __name__ == '__main__':
    globalUser = "Testing"
    app.run(debug=True, port=3003) #re-runs server after change / turn off during production