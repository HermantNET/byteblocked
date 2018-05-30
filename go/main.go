package main

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"./nebulas"
	"./nebulas/util"
	_ "github.com/joho/godotenv/autoload"
)

var contractAddress = "n1mASdEokEtyLysQpVHAQh7zPnDBKtUUBEZ"
var botPriv, _ = hex.DecodeString(os.Getenv("bot"))
var bot, _ = newAccount(botPriv)

func uint128(i uint64) *util.Uint128 {
	return util.NewUint128FromUint(i)
}

func receive(rw http.ResponseWriter, req *http.Request) {
	decoder := json.NewDecoder(req.Body)
	var t map[string]string
	err := decoder.Decode(&t)
	if err != nil {
		panic(err)
	}
	defer req.Body.Close()

	var nonce uint64
	var accInfo map[string]interface{}
	accInfo, _ = accountInfo(bot.addr)

	nonceRaw := accInfo["result"].(map[string]interface{})["nonce"].(string)
	nonce, err = strconv.ParseUint(nonceRaw, 10, 64)

	fmt.Println(bot.addr)
	fmt.Println(nonce)

	payload := fmt.Sprintf(`{"function":"postContract","args":"[\"%v\",\"%v\",\"%v\",\"%v\",\"%v\",\"%v\"]"}`, t["name"], t["author_address"], t["description"], t["contract"], t["contract_address"], t["example"])

	dest, err := core.AddressParse(contractAddress)
	if err != nil {
		fmt.Println(err)
	}

	tx, err := newTx(txParams{
		bot.addr,
		dest,
		uint128(0),
		nonce + 1,
		uint128(1000000),
		uint128(2000000),
		core.TxPayloadCallType,
		[]byte(payload),
	})

	signTransaction(bot, tx)
	encoded, _ := encodeRawTx(tx)

	resp, err := postRawTx(encoded)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(readBody(resp)))
}

func main() {
	fmt.Println("Byteblocked v1")
	http.HandleFunc("/", receive)
	http.ListenAndServe(":6050", nil)
}
