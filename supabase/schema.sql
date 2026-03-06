-- B2B 外贸独立站 - Supabase 表结构
-- 在 Supabase Dashboard > SQL Editor 中执行

-- categories 表
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- products 表
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images text[] DEFAULT '{}',
  specs jsonb DEFAULT '{}',
  description text,
  moq text,
  lead_time text,
  certifications text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- inquiries 表
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  country text,
  phone text,
  quantity text,
  message text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_inquiries_product_id ON inquiries(product_id);

-- RLS 策略（可选：公开只读 products/categories，仅服务端写 inquiries）
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_read" ON categories FOR SELECT USING (true);
CREATE POLICY "products_read" ON products FOR SELECT USING (true);
CREATE POLICY "inquiries_insert" ON inquiries FOR INSERT WITH CHECK (true);
-- 使用 service_role 的请求会绕过 RLS，可写 inquiries
