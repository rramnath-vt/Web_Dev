file://<HOME>/Downloads/CS5244%202/SindhuBookstoreTransact/src/main/java/business/BookstoreDbException.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

action parameters:
uri: file://<HOME>/Downloads/CS5244%202/SindhuBookstoreTransact/src/main/java/business/BookstoreDbException.java
text:
```scala
package business;

public class BookstoreDbException extends RuntimeException {

    public BookstoreDbException(String message) {
        super(message);
    }

    public BookstoreDbException(String message, Throwable cause) {
        super(message, cause);
    }

    public static class BookstoreConnectionDbException extends BookstoreDbException {
        public BookstoreConnectionDbException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static class BookstoreQueryDbException extends BookstoreDbException {
        public BookstoreQueryDbException(String message) {
            super(message);
        }

        public BookstoreQueryDbException(String message, Throwable cause) {
            super(message, cause);
        }
    }
    public static class BookstoreUpdateDbException extends BookstoreDbException {
        public BookstoreUpdateDbException(String message) {
            super(message);
        }

        public BookstoreUpdateDbException(String message, Throwable cause) {
            super(message, cause);
        }
    }
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
	scala.meta.internal.pc.PcCollector.<init>(PcCollector.scala:42)
	scala.meta.internal.pc.PcSemanticTokensProvider$Collector$.<init>(PcSemanticTokensProvider.scala:60)
	scala.meta.internal.pc.PcSemanticTokensProvider.Collector$lzyINIT1(PcSemanticTokensProvider.scala:60)
	scala.meta.internal.pc.PcSemanticTokensProvider.Collector(PcSemanticTokensProvider.scala:60)
	scala.meta.internal.pc.PcSemanticTokensProvider.provide(PcSemanticTokensProvider.scala:81)
	scala.meta.internal.pc.ScalaPresentationCompiler.semanticTokens$$anonfun$1(ScalaPresentationCompiler.scala:99)
```
#### Short summary: 

java.util.NoSuchElementException: next on empty iterator