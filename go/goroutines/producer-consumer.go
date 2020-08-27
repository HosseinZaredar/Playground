package goroutines

import (
	"fmt"
)

func producer(ch chan<- int) {
	for i := 1; i < 10; i++ {
		fmt.Printf("Produced %d\n", i)
		ch <- i
	}
	close(ch)
}

func consumer(ch <-chan int, done chan<- bool) {
	for v := range ch {
		fmt.Printf("Consumed %d\n", v)
	}
	done <- true
}

//PC ...
func PC() {
	done := make(chan bool)
	ch := make(chan int)

	go producer(ch)
	go consumer(ch, done)

	<-done
}
