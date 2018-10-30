# { yyyy: {dd: [{...}, {...}, ...], dd: [{...}, ...], ... }, yyyy: {...}, ... }の形で出力
(2018..2020).each do |year|
  json.set! year do
    json.hoge @destroyed_all_assignments
  end
end
