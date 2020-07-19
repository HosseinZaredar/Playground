package goroutines

import (
	"math/rand"
	"fmt"
	"sync"
	"time"
)

func partialHist(startIdx int, l int, slc []int, hist []int, wg *sync.WaitGroup, ms []sync.Mutex, max int) {
	defer wg.Done()

	localHist := make([]int, max)

	for i := startIdx; i < startIdx + l; i++ {
		hist[slc[i]]++
	}

	for i := 0; i < max; i++ {
		ms[i].Lock()
		hist[i] += localHist[i]
		ms[i].Unlock()
	}
}

// Hist ...
func Hist() {
	const length = 1000000000
	const max = 10
	const N = 100

	var arr [length]int
	var hist [max]int

	for i := 0; i < length; i++ {
		arr[i] = rand.Intn(max)
	}

	var ms [max]sync.Mutex

	l := length / N
	var wg sync.WaitGroup

	start := time.Now()


	for i := 0; i < N; i++ {
		wg.Add(1)
		go partialHist(i * l, l, arr[:], hist[:], &wg, ms[:], max)
	}

	wg.Wait()

	elapsed := time.Since(start)
	fmt.Printf("Elapsed time = %s\n", elapsed)
	
	fmt.Println(hist)
}