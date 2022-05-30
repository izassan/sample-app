package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
)

type SampleAppRequest struct {
    Msg string `json:"msg"`
}

type SampleAppResponse struct {
    Msg string `json:"msg"`
    AppendMsg string `json:"append_msg"`
}

func echoMsg(w http.ResponseWriter, r *http.Request){
    w.Header().Set("Access-Control-Allow-Headers", "*")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set( "Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" )
    if r.Method == http.MethodOptions{
        return
    }

    if r.Method != http.MethodPost{
        w.WriteHeader(http.StatusMethodNotAllowed)
        return
    }
    var request SampleAppRequest
    err := json.NewDecoder(r.Body).Decode(&request)
    if err != nil{
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    resBody := SampleAppResponse{request.Msg, "echoMsg"}
    jsonData, err := json.Marshal(resBody)
    if err != nil{
        log.Fatal(err)
    }
    log.Printf("api called. return value: %s\n", jsonData)
    w.Write(jsonData)
    return
}

func returnUsage() string{
    const usage string = "listen in 'http://localhost:9000'\n" +
        "call 'http://localhost:9000/api/echo'\n" +
        "example:\n" +
        "\tcurl http://localhost:9000/api/echo -X POST -d 'testmsg'\n"
    return usage
}

func echoUsage(w http.ResponseWriter, r *http.Request){
    usage := returnUsage()
    w.Write([]byte(usage))
}

func Handler(request SampleAppRequest)(SampleAppResponse, error){
    return SampleAppResponse{request.Msg, "lambda Handler"}, nil
}


func main() {
    env := os.Getenv("ENV")
    if env == "lambda"{
        lambda.Start(Handler)
    }else{
        http.HandleFunc("/api/echo", echoMsg)
        http.HandleFunc("/", echoUsage)
        fmt.Printf(returnUsage())
        if err := http.ListenAndServe(":9000", nil); err != nil {
            log.Fatal("ListenAndServe:", err)
        }
    }
}
