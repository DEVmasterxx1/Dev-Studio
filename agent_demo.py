# agent_demo.py (top of file) — add this shim before any pixelagent/pixeltable imports
import importlib

# Ensure pgvector.sqlalchemy exposes HalfVector (alias HALFVEC -> HalfVector)
try:
    pgs = importlib.import_module("pgvector.sqlalchemy")
    if not hasattr(pgs, "HalfVector") and hasattr(pgs, "HALFVEC"):
        setattr(pgs, "HalfVector", getattr(pgs, "HALFVEC"))
except Exception:
    # If pgvector isn't installed yet, let the normal import error surface later
    pass

# Now import the provider Agent you want
from pixelagent.openai.agent import Agent

agent = Agent(
    name="my_assistant",
    system_prompt="You are a helpful assistant."
)

resp = agent.chat("Hello, who are you?")
print(resp)

