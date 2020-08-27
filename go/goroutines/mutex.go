package goroutines

import (
	// "Go-Playground/goroutines"
	"fmt"
	"sync"
)

func increament(n *int, m *sync.Mutex, wg *sync.WaitGroup) {
	m.Lock()
	(*n)++
	m.Unlock()
	wg.Done()
}

func Mutex() {
	// goroutines.WP()
	n := 0
	var wg sync.WaitGroup
	var m sync.Mutex
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go increament(&n, &m, &wg)
	}
	wg.Wait()
	fmt.Println(n)
}
