'use server';
import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Add Gemstone
export async function addGemstone(formData) {
  const name = formData.get('name');
  const buy_price = parseFloat(formData.get('buy_price'));
  const max_sale_price = parseFloat(formData.get('max_sale_price'));
  const min_sale_price = parseFloat(formData.get('min_sale_price'));
  const quantity = parseInt(formData.get('quantity'), 10);
  const price_unit = formData.get('price_unit'); // 👈 Capturing unit selection
  const customDate = formData.get('created_at');

  if (customDate) {
    const formattedDate = new Date(customDate).toISOString();
    await sql`
      INSERT INTO gemstones (name, buy_price, max_sale_price, min_sale_price, quantity, price_unit, created_at)
      VALUES (${name}, ${buy_price}, ${max_sale_price}, ${min_sale_price}, ${quantity}, ${price_unit}, ${formattedDate})
    `;
  } else {
    await sql`
      INSERT INTO gemstones (name, buy_price, max_sale_price, min_sale_price, quantity, price_unit)
      VALUES (${name}, ${buy_price}, ${max_sale_price}, ${min_sale_price}, ${quantity}, ${price_unit})
    `;
  }
  revalidatePath('/');
}

// 2. Fetch Gemstones
export async function getGemstones() {
  return await sql`SELECT * FROM gemstones ORDER BY id DESC`;
}

// 3. Delete Gemstone
export async function deleteGemstone(id) {
  await sql`DELETE FROM gemstones WHERE id = ${id}`;
  revalidatePath('/');
}

// 4. Update/Edit Gemstone
export async function updateGemstone(id, data) {
  await sql`
    UPDATE gemstones 
    SET name = ${data.name}, buy_price = ${data.buy_price}, 
        max_sale_price = ${data.max_sale_price}, min_sale_price = ${data.min_sale_price}, 
        quantity = ${data.quantity}, price_unit = ${data.price_unit} -- 👈 Updated unit
    WHERE id = ${id}
  `;
  revalidatePath('/');
}

// 5. Create Invoice and Subtract Stock Quantity
export async function createInvoiceAndSell(invoiceData) {
  const {
    gemstone_id, customer_name, customer_number, seller_name, 
    seller_number, gem_name, sold_price, sold_quantity, weight, dimensions, price_unit
  } = invoiceData;

  const gem = await sql`SELECT quantity FROM gemstones WHERE id = ${gemstone_id}`;
  if (!gem || gem.length === 0 || gem.quantity < sold_quantity) {
    throw new Error('Not enough inventory stock available!');
  }

  await sql`
    UPDATE gemstones 
    SET quantity = quantity - ${sold_quantity} 
    WHERE id = ${gemstone_id}
  `;

  const invoice = await sql`
    INSERT INTO invoices (gemstone_id, customer_name, customer_number, seller_name, seller_number, gem_name, sold_price, sold_quantity, weight, dimensions, price_unit)
    VALUES (${gemstone_id}, ${customer_name}, ${customer_number}, ${seller_name}, ${seller_number}, ${gem_name}, ${sold_price}, ${sold_quantity}, ${weight}, ${dimensions}, ${price_unit})
    RETURNING id, created_at
  `;

  revalidatePath('/');
  return invoice;
}

// 6. Fetch Invoices
export async function getInvoices() {
  return await sql`SELECT * FROM invoices ORDER BY id DESC`;
}

