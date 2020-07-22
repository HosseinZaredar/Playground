package networking

import (
	"fmt"
	"net"
	"os"
)

func checkError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "Fatal error: %s", err.Error())
		os.Exit(1)
	}
}

func handleClient(conn net.Conn) {
	defer conn.Close()
	_, err := conn.Write([]byte("Hello dear client!"))
	checkError(err)
}

//Server ...
func Server() {
	service := "127.0.0.1:1301"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", service)
	checkError(err)

	fmt.Println(tcpAddr)
	listener, err := net.ListenTCP("tcp4", tcpAddr)

	for {
		conn, err := listener.Accept()
		if err != nil {
			continue
		}

		go handleClient(conn)
	}
}
