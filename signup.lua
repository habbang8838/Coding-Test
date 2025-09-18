-- 각 스레드마다 난수 시드 초기화
init = function(args)
  math.randomseed(os.time() + tonumber(tostring({}):sub(8)))
end

wrk.method = "POST"

request = function()
  local email = string.format("user%d@test.com", math.random(1, 
10000000))
  local body = string.format(
    
'{"email":"%s","password":"pw123","name":"test","birth":"2000-01-01"}',
    email
  )
  return wrk.format("POST", "/api/signup", 
{["Content-Type"]="application/json"}, body)
end

-- 응답 상태 코드 체크
response = function(status, headers, body)
  if status ~= 200 and status ~= 201 then
    print("Non-OK response: " .. status)
  end
end

