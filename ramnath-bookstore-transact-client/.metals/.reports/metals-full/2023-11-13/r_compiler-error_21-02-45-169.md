file://<HOME>/Downloads/CS5244%202/SindhuBookstoreTransact/src/main/java/business/customer/CustomerDao.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

action parameters:
offset: 367
uri: file://<HOME>/Downloads/CS5244%202/SindhuBookstoreTransact/src/main/java/business/customer/CustomerDao.java
text:
```scala
package business.customer;

import java.sql.Connection;
import java.util.Date;
import java.util.List;

public interface CustomerDao {

    public long create(Connection connection,
                       String customerName,
                       String address,
                       String phone,
                       String email,
                       String@@ ccNumber,
                       Date ccExpDate);

    public List<Customer> findAll();

    public Customer findByCustomerId(long customerId);

}

```



#### Error stacktrace:

```
scala.collection.Iterator$$anon$19.next(Iterator.scala:973)
	scala.collection.Iterator$$anon$19.next(Iterator.scala:971)
	scala.collection.mutable.MutationTracker$CheckedIterator.next(MutationTracker.scala:76)
	scala.collection.IterableOps.head(Iterable.scala:222)
	scala.collection.IterableOps.head$(Iterable.scala:222)
	scala.collection.AbstractIterable.head(Iterable.scala:933)
	dotty.tools.dotc.interactive.InteractiveDriver.run(InteractiveDriver.scala:168)
	scala.meta.internal.pc.MetalsDriver.run(MetalsDriver.scala:45)
	scala.meta.internal.pc.HoverProvider$.hover(HoverProvider.scala:34)
	scala.meta.internal.pc.ScalaPresentationCompiler.hover$$anonfun$1(ScalaPresentationCompiler.scala:329)
```
#### Short summary: 

java.util.NoSuchElementException: next on empty iterator