package networking

import (
	"fmt"
	"net"
)

//Client ...
func Client() {
	service := "127.0.0.1:1302"
	udpAddr, err := net.ResolveUDPAddr("udp4", service)
	checkError(err)

	conn, err := net.DialUDP("udp", nil, udpAddr)
	checkError(err)

	_, err = conn.Write([]byte("Hello UDP server!"))
	checkError(err)

	var buffer [512]byte
	conn.Read(buffer[:])

	fmt.Println(string(buffer[:]))
}
