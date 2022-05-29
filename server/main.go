package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type SampleAppResponse struct {
    Msg string `json:"msg"`
}

func echoMsg(w http.ResponseWriter, r *http.Request){
    if r.Method != http.MethodPost {
        w.WriteHeader(http.StatusMethodNotAllowed)
        return
    }
    bufbody := new(bytes.Buffer)
    bufbody.ReadFrom(r.Body)
    bodyString := bufbody.String()
    resBody := SampleAppResponse{bodyString}
    jsonData, err := json.Marshal(resBody)
    if err != nil{
        log.Fatal(err)
    }
    log.Printf("api called. return value: %s\n", jsonData)
    w.Header().Set("Access-Control-Allow-Headers", "*")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set( "Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS" )
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


func main() {
    http.HandleFunc("/api/echo", echoMsg)
    http.HandleFunc("/", echoUsage)
    fmt.Printf(returnUsage())
    if err := http.ListenAndServe(":9000", nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
