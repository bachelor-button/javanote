

# 第二节 CyclicBarrier



支持多线程在执行各自任务的时候，到达某个状态点就等待，等所有线程都到达这个状态点再继续执行后步骤。

```java
public class O19CyclicBarrierTest {

    private static List<List<String>> matrix = new ArrayList<>();

    static {
        matrix.add(Arrays.asList("normal","special","end"));
        matrix.add(Arrays.asList("normal","normal","special","end"));
        matrix.add(Arrays.asList("normal","normal","normal","special","end"));
    }

    public static void main(String[] args) {


        // 1.创建CyclicBarrier对象
        CyclicBarrier barrier = new CyclicBarrier(3);

        // 2.创建3个线程分别执行各自的任务
        new Thread(()->{

            try {
                List<String> list = matrix.get(0);

                for (String value : list) {

                    TimeUnit.SECONDS.sleep(1);

                    System.out.println(Thread.currentThread().getName() + " value = " + value);

                    if ("special".equals(value)) {

                        // 遇到特殊任务标记，就让当前线程等一下
                        barrier.await();
                    }

                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }

        }, "thread01").start();

        new Thread(()->{

            try {
                List<String> list = matrix.get(1);

                for (String value : list) {

                    TimeUnit.SECONDS.sleep(1);

                    System.out.println(Thread.currentThread().getName() + " value = " + value);

                    if ("special".equals(value)) {

                        // 遇到特殊任务标记，就让当前线程等一下
                        barrier.await();
                    }

                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }

        }, "thread02").start();
        new Thread(()->{

            try {
                List<String> list = matrix.get(2);

                for (String value : list) {

                    TimeUnit.SECONDS.sleep(1);

                    System.out.println(Thread.currentThread().getName() + " value = " + value);

                    if ("special".equals(value)) {

                        // 遇到特殊任务标记，就让当前线程等一下
                        barrier.await();
                    }

                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }

        }, "thread03").start();
    }

}
```







[上一节](verse01.html) [回目录](index.html) [下一节](verse03.html)