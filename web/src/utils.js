import { jsPDF } from 'jspdf';
const CART_STORAGE_KEY = 'mumbai_jaan_cart';
export class CartManager {
    static getCart() {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : { items: [], total: 0 };
    }
    static saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
    static addItem(item) {
        const cart = this.getCart();
        const existingItem = cart.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        }
        else {
            const cartItem = { ...item, quantity: 1 };
            cart.items.push(cartItem);
        }
        this.updateTotal(cart);
        this.saveCart(cart);
    }
    static removeItem(itemId) {
        const cart = this.getCart();
        cart.items = cart.items.filter(i => i.id !== itemId);
        this.updateTotal(cart);
        this.saveCart(cart);
    }
    static updateQuantity(itemId, quantity) {
        const cart = this.getCart();
        const item = cart.items.find(i => i.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            }
            else {
                item.quantity = quantity;
                this.updateTotal(cart);
                this.saveCart(cart);
            }
        }
    }
    static clearCart() {
        localStorage.removeItem(CART_STORAGE_KEY);
    }
    static updateTotal(cart) {
        cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
}
export class InvoiceGenerator {
    static generatePDF(data) {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        // Header
        doc.setFillColor(255, 159, 28);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(26, 26, 26);
        doc.setFontSize(24);
        doc.text('Mumbai Jan Biryani', pageWidth / 2, 20, { align: 'center' });
        // Body
        doc.setTextColor(26, 26, 26);
        doc.setFontSize(10);
        let yPosition = 50;
        // Order Details
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Order Details', 20, yPosition);
        yPosition += 10;
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Order Number: ${data.orderNumber}`, 20, yPosition);
        yPosition += 7;
        doc.text(`Customer Name: ${data.userName}`, 20, yPosition);
        yPosition += 7;
        doc.text(`Order Type: ${data.orderType}`, 20, yPosition);
        yPosition += 7;
        doc.text(`Date & Time: ${data.timestamp}`, 20, yPosition);
        yPosition += 15;
        // Items Table
        doc.setFont(undefined, 'bold');
        doc.text('Items Ordered', 20, yPosition);
        yPosition += 10;
        // Table headers
        doc.setFont(undefined, 'bold');
        doc.setFillColor(200, 200, 200);
        doc.rect(20, yPosition - 5, pageWidth - 40, 8, 'F');
        doc.text('Item', 25, yPosition);
        doc.text('Qty', 120, yPosition);
        doc.text('Price', 150, yPosition);
        doc.text('Total', 180, yPosition);
        yPosition += 12;
        // Table data
        doc.setFont(undefined, 'normal');
        data.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            doc.text(item.name, 25, yPosition);
            doc.text(`${item.quantity}`, 120, yPosition);
            doc.text(`₹${item.price.toFixed(2)}`, 150, yPosition);
            doc.text(`₹${itemTotal.toFixed(2)}`, 180, yPosition);
            yPosition += 8;
        });
        // Total
        yPosition += 5;
        doc.setFont(undefined, 'bold');
        doc.setFillColor(255, 159, 28);
        const rectWidth = 90;
        const rightMargin = 20;
        const rectX = pageWidth - rightMargin - rectWidth;
        const textX = pageWidth - rightMargin;
        doc.rect(rectX, yPosition, rectWidth, 10, 'F');
        doc.setTextColor(26, 26, 26);
        doc.text(`Total: ₹${data.total.toFixed(2)}`, textX, yPosition + 7, { align: 'right' });
        // Footer
        doc.setFont(undefined, 'italic');
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text('Thank you for ordering from Mumbai Jan Biryani!', pageWidth / 2, pageHeight - 10, {
            align: 'center',
        });
        // Save the PDF
        doc.save(`Mumbai_Jan_Biryani_Order_${data.orderNumber}.pdf`);
    }
}
export class WhatsAppIntegration {
    static getWhatsAppLink(data) {
        const message = this.formatMessage(data);
        const phoneNumber = '9177188 38619'; // Add your WhatsApp number here
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    }
    static formatMessage(data) {
        const itemsList = data.items
            .map(item => `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`)
            .join('\n');
        return `Hi, I would like to place an order at Mumbai Jan Biryani!\n\n📋 *Order Details*\nOrder Number: ${data.orderNumber}\nName: ${data.userName}\nOrder Type: ${data.orderType}\n\n🍛 *Items Ordered*\n${itemsList}\n\n💰 *Total: ₹${data.total.toFixed(2)}*\n\nPlease confirm my order. Thank you!`;
    }
}
