-- 测试数据（在 schema.sql 执行后运行）
-- 可先在 Supabase Dashboard 执行 schema.sql，再执行本文件

INSERT INTO categories (id, name, slug, description) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Electronic components and devices'),
  ('a0000000-0000-0000-0000-000000000002', 'Hardware', 'hardware', 'Industrial hardware and tools'),
  ('a0000000-0000-0000-0000-000000000003', 'Machinery', 'machinery', 'Machinery and equipment')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (name, slug, category_id, images, specs, description, moq, lead_time, certifications, is_featured, is_active) VALUES
  ('Industrial Sensor Module', 'industrial-sensor-module', 'a0000000-0000-0000-0000-000000000001', '{}', '{"Voltage": "12-24V", "Output": "Analog/Digital", "IP Rating": "IP67"}'::jsonb, 'High precision sensor for industrial automation.', '100 pcs', '2-3 weeks', ARRAY['CE', 'ROHS'], true, true),
  ('Heavy Duty Connector', 'heavy-duty-connector', 'a0000000-0000-0000-0000-000000000001', '{}', '{"Pins": "4-24", "Material": "Metal", "IP Rating": "IP68"}'::jsonb, 'Robust connector for harsh environments.', '500 pcs', '3-4 weeks', ARRAY['CE', 'ISO'], true, true),
  ('Steel Bracket Set', 'steel-bracket-set', 'a0000000-0000-0000-0000-000000000002', '{}', '{"Material": "Stainless Steel", "Size": "M6-M12"}'::jsonb, 'Stainless steel mounting brackets.', '200 sets', '1-2 weeks', ARRAY['ISO'], true, true)
ON CONFLICT (slug) DO NOTHING;
