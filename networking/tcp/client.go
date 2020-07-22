package networking

import (
	"fmt"
	"net"
)

//Client ...
func Client() {
	service := "127.0.0.1:1301"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err)

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkError(err)

	var buffer [512]byte
	conn.Read(buffer[:])

	fmt.Println(string(buffer[:]))
}
