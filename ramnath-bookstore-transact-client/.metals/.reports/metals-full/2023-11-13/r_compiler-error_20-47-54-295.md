file://<HOME>/Downloads/CS5244%202/SindhuBookstoreTransact/src/main/java/business/order/DefaultOrderService.java
### java.util.NoSuchElementException: next on empty iterator

occurred in the presentation compiler.

action parameters:
uri: file://<HOME>/Downloads/CS5244%202/SindhuBookstoreTransact/src/main/java/business/order/DefaultOrderService.java
text:
```scala
package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.CustomerForm;
import business.order.OrderDao;
import business.order.LineItem;
import business.order.LineItemDao;
import business.customer.Customer;
import business.customer.CustomerDao;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.*;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.stream.Collectors;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}
	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}
	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}
	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.getCustomerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.getBookId()))
				.collect(Collectors.toList());
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date date = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					date, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}

	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		return new GregorianCalendar(Integer.parseInt(yearString), Integer.parseInt( monthString)-1, 1).getTime();
	}

	private int generateConfirmationNumber() {
		Random random = new Random();
		return random.nextInt(999999999);
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e);
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private void validateCustomer(CustomerForm customerForm) {

		String name = customerForm.getName();
		String address = customerForm.getAddress();
		String phone = customerForm.getPhone();
		String email = customerForm.getEmail();
		String ccNumber = customerForm.getCcNumber();

		if (name == null || name.equals("") || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}

		if (address == null || address.equals("") || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address","Invalid address field");
		}

		if(phone==null){
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}

		String cleanedPhone = "";
		cleanedPhone = phone.replace(" ","");
		cleanedPhone = cleanedPhone.replace("-","");
		cleanedPhone = cleanedPhone.replace(")","");
		cleanedPhone = cleanedPhone.replace("(","");

		if (cleanedPhone == null || cleanedPhone.equals("") || cleanedPhone.length() != 10) {
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}

		if(email==null || email.contains(" ") || !email.contains("@") || email.substring(email.length()-1).equals(".")){
			throw new ApiException.ValidationFailure("email","Invalid email field");
		}

		if(ccNumber==null){
			throw new ApiException.ValidationFailure("ccNumber","Invalid ccNumber field");
		}

		String cleanedCCNumber = "";
		cleanedCCNumber = ccNumber.replace(" ","");
		cleanedCCNumber = cleanedCCNumber.replace("-","");

		if(cleanedCCNumber.length() < 14 || cleanedCCNumber.length() > 16){
			throw new ApiException.ValidationFailure("ccNumber","Invalid ccNumber field");
		}

		// TODO: Validation checks for address, phone, email, ccNumber

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date.");
		}
	}


	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		Calendar c = Calendar.getInstance();
		int year = c.get(Calendar.YEAR);
		int month = c.get(Calendar.MONTH);
		if(ccExpiryMonth== null || ccExpiryYear==null ||Integer.parseInt(ccExpiryYear) < year || (Integer.parseInt(ccExpiryYear) == year && Integer.parseInt(ccExpiryMonth) < month)
 Integer.parseInt(ccExpiryMonth) < 0 || Integer.parseInt(ccExpiryMonth) > 11 ){
			return true;
		}
		return false;

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() < 1) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if(databaseBook.getCategoryId() != item.getCategoryId()){
				throw new ApiException.ValidationFailure("Invalid Category Id");
			}

			if(databaseBook.getPrice() != item.getPrice()){
				throw new ApiException.ValidationFailure("Invalid Price");
			}
			// TODO: complete the required validations
		});
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