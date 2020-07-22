package networking

import (
	"fmt"
	"net"
	"os"
	"time"
)

func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
}

func handleClient(conn *net.UDPConn, clientAddr *net.UDPAddr, in [512]byte) {
	fmt.Printf("got '%s' from %s\n", string(in[:]), clientAddr)
	time.Sleep(3 * time.Second)
	conn.WriteToUDP([]byte("This is a UDP message!"), clientAddr)
}

//Server ...
func Server() {
	service := "127.0.0.1:1302"
	udpAddr, err := net.ResolveUDPAddr("udp4", service)
	checkError(err)

	fmt.Println(udpAddr)
	conn, err := net.ListenUDP("udp", udpAddr)

	var buffer [512]byte

	for {
		_, clientAddr, err := conn.ReadFromUDP(buffer[0:])
		if err != nil {
			continue
		}
		go handleClient(conn, clientAddr, buffer)
	}
}
